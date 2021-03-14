import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import { useStorage } from "@ionic/react-hooks/storage";
import { isPlatform } from "@ionic/react";
import {
  CameraResultType,
  CameraSource,
  CameraPhoto,
  Capacitor,
  FilesystemDirectory,
} from "@capacitor/core";
import { Boleto } from "../pages/models/Boleto";

export function usePhotoGallery() {
  const { getPhoto } = useCamera();
  const [photo, setPhoto] = useState<Photo>();

  const takePhoto = async (
    setFoto: Dispatch<SetStateAction<Boleto>>,
    boleto: Boleto
  ) => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";

    const base64Data = await base64FromPath(cameraPhoto.webPath!);

    setFoto({ ...boleto, ["foto"]: base64Data });

    setPhoto({
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
    });
  };

  return { photo, takePhoto };
}

export interface Photo {
  filepath: string;
  webviewPath?: string;
}
