import React from 'react';
import { SegmentationTable } from '@ohif/ui-next';
import { useActiveViewportSegmentationRepresentations } from '../hooks/useActiveViewportSegmentationRepresentations';

export default function PanelSegmentation({
  servicesManager,
  commandsManager,
  extensionManager,
  configuration,
  children,
}: withAppTypes) {
  const { customizationService } = servicesManager.services;

  const { segmentationsWithRepresentations, disabled } =
    useActiveViewportSegmentationRepresentations({
      servicesManager,
    });

  const handlers = {
    onSegmentationAdd: async () => {
      commandsManager.run('createLabelmapForViewport');
    },

    onSegmentationClick: (segmentationId: string) => {
      commandsManager.run('setActiveSegmentation', { segmentationId });
    },

    onSegmentAdd: segmentationId => {
      commandsManager.run('addSegment', { segmentationId });
    },

    onSegmentClick: (segmentationId, segmentIndex) => {
      commandsManager.run('setActiveSegmentAndCenter', { segmentationId, segmentIndex });
    },

    onSegmentEdit: (segmentationId, segmentIndex) => {
      commandsManager.run('editSegmentLabel', { segmentationId, segmentIndex });
    },

    onSegmentationEdit: segmentationId => {
      commandsManager.run('editSegmentationLabel', { segmentationId });
    },

    onSegmentColorClick: (segmentationId, segmentIndex) => {
      commandsManager.run('editSegmentColor', { segmentationId, segmentIndex });
    },

    onSegmentDelete: (segmentationId, segmentIndex) => {
      commandsManager.run('deleteSegment', { segmentationId, segmentIndex });
    },

    onToggleSegmentVisibility: (segmentationId, segmentIndex, type) => {
      commandsManager.run('toggleSegmentVisibility', { segmentationId, segmentIndex, type });
    },

    onToggleSegmentLock: (segmentationId, segmentIndex) => {
      commandsManager.run('toggleSegmentLock', { segmentationId, segmentIndex });
    },

    onToggleSegmentationRepresentationVisibility: (segmentationId, type) => {
      commandsManager.run('toggleSegmentationVisibility', { segmentationId, type });
    },

    onSegmentationDownload: segmentationId => {
      commandsManager.run('downloadSegmentation', { segmentationId });
    },

    storeSegmentation: async segmentationId => {
      commandsManager.run('storeSegmentation', { segmentationId });
    },

    onSegmentationDownloadRTSS: segmentationId => {
      commandsManager.run('downloadRTSS', { segmentationId });
    },

    setStyle: (segmentationId, type, key, value) => {
      commandsManager.run('setSegmentationStyle', { segmentationId, type, key, value });
    },

    toggleRenderInactiveSegmentations: () => {
      commandsManager.run('toggleRenderInactiveSegmentations');
    },

    onSegmentationRemoveFromViewport: segmentationId => {
      commandsManager.run('removeSegmentationFromViewport', { segmentationId });
    },

    onSegmentationDelete: segmentationId => {
      commandsManager.run('deleteSegmentation', { segmentationId });
    },
  };

  const { mode: SegmentationTableMode } = customizationService.getCustomization(
    'PanelSegmentation.tableMode',
    {
      id: 'default.segmentationTable.mode',
      mode: 'collapsed',
    }
  );

  // custom onSegmentationAdd if provided
  const { onSegmentationAdd } = customizationService.getCustomization(
    'PanelSegmentation.onSegmentationAdd',
    {
      id: 'segmentation.onSegmentationAdd',
      onSegmentationAdd: handlers.onSegmentationAdd,
    }
  );

  const { disableEditing } = customizationService.getCustomization(
    'PanelSegmentation.disableEditing',
    {
      id: 'default.disableEditing',
      disableEditing: false,
    }
  );

  const { showAddSegment } = customizationService.getCustomization(
    'PanelSegmentation.showAddSegment',
    {
      id: 'default.showAddSegment',
      showAddSegment: true,
    }
  );

  return (
    <>
      <SegmentationTable
        disabled={disabled}
        data={segmentationsWithRepresentations}
        mode={SegmentationTableMode}
        title="Segmentations"
        disableEditing={disableEditing}
        onSegmentationAdd={onSegmentationAdd}
        onSegmentationClick={handlers.onSegmentationClick}
        onSegmentationDelete={handlers.onSegmentationDelete}
        showAddSegment={showAddSegment}
        onSegmentAdd={handlers.onSegmentAdd}
        onSegmentClick={handlers.onSegmentClick}
        onSegmentEdit={handlers.onSegmentEdit}
        onSegmentationEdit={handlers.onSegmentationEdit}
        onSegmentColorClick={handlers.onSegmentColorClick}
        onSegmentDelete={handlers.onSegmentDelete}
        onToggleSegmentVisibility={handlers.onToggleSegmentVisibility}
        onToggleSegmentLock={handlers.onToggleSegmentLock}
        onToggleSegmentationRepresentationVisibility={
          handlers.onToggleSegmentationRepresentationVisibility
        }
        onSegmentationDownload={handlers.onSegmentationDownload}
        storeSegmentation={handlers.storeSegmentation}
        onSegmentationDownloadRTSS={handlers.onSegmentationDownloadRTSS}
        setStyle={handlers.setStyle}
        toggleRenderInactiveSegmentations={handlers.toggleRenderInactiveSegmentations}
        onSegmentationRemoveFromViewport={handlers.onSegmentationRemoveFromViewport}
        setFillAlpha={handlers.setFillAlpha}
        setOutlineWidth={handlers.setOutlineWidth}
        renderInactiveSegmentations={handlers.getRenderInactiveSegmentations()}
        setRenderFill={handlers.setRenderFill}
        setRenderOutline={handlers.setRenderOutline}
        setFillAlphaInactive={handlers.setFillAlphaInactive}
      >
        {children}
        <SegmentationTable.Config />
        <SegmentationTable.AddSegmentationRow />

        {SegmentationTableMode === 'collapsed' ? (
          <SegmentationTable.Collapsed>
            <SegmentationTable.SelectorHeader />
            <SegmentationTable.AddSegmentRow />
            <SegmentationTable.Segments />
          </SegmentationTable.Collapsed>
        ) : (
          <SegmentationTable.Expanded>
            <SegmentationTable.Header />
            {/* <SegmentationTable.AddSegmentRow /> */}
            <SegmentationTable.Segments />
          </SegmentationTable.Expanded>
        )}
      </SegmentationTable>
    </>
  );
}
