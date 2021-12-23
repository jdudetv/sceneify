import {
  OBSRequestTypes as BaseRequestTypes,
  OBSResponseTypes as BaseResponseTypes,
} from "obs-websocket-js";

declare module "obs-websocket-js" {
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

    boundsType:
      | "OBS_BOUNDS_NONE"
      | "OBS_BOUNDS_STRETCH"
      | "OBS_BOUNDS_SCALE_INNER"
      | "OBS_BOUNDS_SCALE_OUTER"
      | "OBS_BOUNDS_SCALE_TO_WIDTH"
      | "OBS_BOUNDS_SCALE_TO_HEIGHT"
      | "OBS_BOUNDS_MAX_ONLY";
    boundsAlignment: number;
    boundsWidth: number;
    boundsHeight: number;

    cropLeft: number;
    cropTop: number;
    cropRight: number;
    cropBottom: number;
  }

  export interface OBSRequestTypesOverrides {
    GetSceneItemList: {
      sceneName: string;
    };

    GetSceneItemTransform: {
      sceneName: string;
      sceneItemId: number;
    };

    SetSceneItemTransform: {
      sceneName: string;
      sceneItemId: number;
      transform: Partial<SceneItemTransform>;
    };

    CreateSceneItem: {
      sceneName: string;
      sourceName: string;
      sceneItemEnabled?: boolean;
    };

    RemoveSceneItem: {
      sceneName: string;
      sceneItemId: number;
    };

    GetSceneList: never;

    GetSceneItemEnabled: {
      sceneName: string;
      sceneItemId: number;
    };

    SetSceneItemEnabled: {
      sceneName: string;
      sceneItemId: number;
      sceneItemEnabled: boolean;
    };

    GetSceneItemLocked: {
      sceneName: string;
      sceneItemId: number;
    };

    SetSceneItemLocked: {
      sceneName: string;
      sceneItemId: number;
      sceneItemLocked: boolean;
    };
  }

  export interface OBSResponseTypesOverrides {
    GetSceneItemList: {
      sceneItemId: number;
      sceneItemIndex: number;
      sourceName: string;
      sourceType: string;
      inputKind?: string;
      isGroup?: boolean;
    }[];

    GetSceneItemTransform: { sceneItemTransform: SceneItemTransform };

    SetSceneItemTransform: undefined;

    CreateSceneItem: {
      sceneItemId: number;
    };

    RemoveSceneItem: undefined;

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
      inputSettings: Record<any, any>;
      inputName: string;
      inputKind: string;
    };

    GetSceneItemEnabled: {
      sceneItemEnabled: boolean;
    };

    SetSceneItemEnabled: undefined;

    GetSceneItemLocked: {
      sceneItemLocked: boolean;
    };

    SetSceneItemLocked: undefined;
  }

  export type PatchedOBSRequestTypes =
    | Omit<BaseRequestTypes, keyof OBSRequestTypesOverrides> &
        OBSRequestTypesOverrides;

  export type PatchedOBSResponseTypes =
    | Omit<BaseResponseTypes, keyof OBSResponseTypesOverrides> &
        OBSResponseTypesOverrides;
}
