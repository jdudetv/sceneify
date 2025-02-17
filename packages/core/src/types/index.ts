import { Source } from "../Source";
import {
  OBSRequestTypes as BaseRequestTypes,
  OBSResponseTypes as BaseResponseTypes,
  OBSEventTypes as BaseEventTypes,
} from "obs-websocket-js";
import { BoundsType, MonitoringType } from "../constants";

/**
 * Makes every field and nested field optional in the provided object.
 */
export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type FilterType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

export type SourceItemType<S extends Source> = ReturnType<
  S["createSceneItemObject"]
>;

export type Settings = Record<string, any>;

export interface Filter {
  filterName: string;
  filterEnabled: boolean;
  filterIndex: number;
  filterKind: string;
  filterSettings: Settings;
}

export interface SceneItemTransform {
  sourceWidth: number;
  sourceHeight: number;

  positionX: number;
  positionY: number;

  rotation: number;

  scaleX: number;
  scaleY: number;

  width: number;
  height: number;

  alignment: number;

  boundsType: BoundsType;
  boundsAlignment: number;
  boundsWidth: number;
  boundsHeight: number;

  cropLeft: number;
  cropTop: number;
  cropRight: number;
  cropBottom: number;
}

export interface OBSRequestTypesOverrides {
  SetSceneItemTransform: {
    sceneName: string;
    sceneItemId: number;
    sceneItemTransform: Partial<SceneItemTransform>;
  };

  GetSourceFilterList: {
    sourceName: string;
  };

  CreateSourceFilter: {
    sourceName: string;
    filterName: string;
    filterIndex?: number;
    filterKind: string;
    filterSettings?: Settings;
  };

  RemoveSourceFilter: {
    sourceName: string;
    filterName: string;
  };

  GetSourceFilterDefaultSettings: {
    filterKind: string;
  };

  GetSourceFilter: {
    sourceName: string;
    filterName: string;
  };

  SetSourceFilterIndex: {
    sourceName: string;
    filterName: string;
    filterIndex: number;
  };

  SetSourceFilterSettings: {
    sourceName: string;
    filterName: string;
    filterSettings: Settings;
  };

  SetSourceFilterEnabled: {
    sourceName: string;
    filterName: string;
    filterEnabled: boolean;
  };

  SetSourcePrivateSettings: {
    sourceName: string;
    sourceSettings: Settings;
  };

  GetSourcePrivateSettings: {
    sourceName: string;
  };

  SetInputAudioMonitorType: {
    inputName: string;
    monitorType: MonitoringType;
  };
}

export interface OBSResponseTypesOverrides {
  GetSceneItemList: {
    sceneItems: {
      sceneItemId: number;
      sceneItemIndex: number;
      sourceName: string;
      sourceType: string;
      inputKind?: string;
      isGroup?: boolean;
    }[];
  };

  GetSceneItemTransform: { sceneItemTransform: SceneItemTransform };

  GetSceneList: {
    scenes: {
      sceneName: string;
      sceneIndex: number;
    }[];
    currentProgramSceneName: string;
    currentPreviewSceneName: string;
  };

  GetInputList: {
    inputs: {
      inputName: string;
      inputKind: string;
      unversionedInputKind: string;
    }[];
  };

  GetInputSettings: {
    inputSettings: Settings;
    inputName: string;
    inputKind: string;
  };

  GetInputAudioMonitorType: {
    monitorType: MonitoringType;
  };

  GetSourceFilterList: {
    filters: Filter[];
  };

  CreateSourceFilter: undefined;

  RemoveSourceFilter: undefined;

  GetSourceFilterDefaultSettings: { filterSettings: Settings };

  GetSourceFilter: Filter;

  SetSourceFilterIndex: undefined;

  SetSourceFilterSettings: undefined;

  SetSourceFilterEnabled: undefined;

  SetSourcePrivateSettings: undefined;

  GetSourcePrivateSettings: {
    sourceSettings: Settings;
  };
}

export interface OBSEventTypesOverrides {}

export type OBSRequestTypes =
  | Omit<BaseRequestTypes, keyof OBSRequestTypesOverrides> &
      OBSRequestTypesOverrides;

export type OBSResponseTypes =
  | Omit<BaseResponseTypes, keyof OBSResponseTypesOverrides> &
      OBSResponseTypesOverrides;

export type OBSEventTypes =
  | Omit<BaseEventTypes, keyof OBSEventTypesOverrides> & OBSEventTypesOverrides;
