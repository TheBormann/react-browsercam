# react-browsercam

A fully responsive camera component for React.

Browser compatibility:

- [Fullscreen API](https://caniuse.com/?search=fullscreen) (optional)
- [MediaStream API](https://caniuse.com/?search=Mediastream)

Note: HTTPS is needed to access the camera.

## Features

- Fully customizable image capturing hook
- Fullscreen support
- Allows for Custom camera interface

## Installation

```shell
npm install --save react-browsercam
```

## Demo

TODO: Add link

## Usage

```TS
import React from "react";
import Camera from "react-browsercam";

const WebcamComponent = () => <Camera />;
```

### useCapture Props

| value | type | default | description |
|------|------|---------|-------|
| MediaStreamConstraints? | ``MediaStreamConstraints \| undefined`` | ``audio: false,``<br />``video: {``<br />``width: { ideal: 4096 },``<br />``height: { ideal: 4096 },``<br />``facingMode: 'environment }`` | MediaStreamConstraint(s) affecting the displayed and captured images |
| imageFormat? | `'image/webp' \| 'image/png' \| 'image/jpeg'` | Selected image type |
| imageCompression? | `number?` | `0.91` | Selected image compression rate |

### useCapture Return values

| prop | type | default | description |
|------|------|---------|-------|
| image | `Blob \| HTMLCanvasElement \| string \| null` | `null` | Contains the last captured image |
| isAccessingCamera | `bool` | `false` | Allows you to check if the camera go access to the mediastream |
| videoRef | `HTMLVideoElement` | `document.createElement('video')` | Allows you to show the mediastream by adding, by adding the `videoRef` to HTMLVideoElement elements like so `ref={videoRef}` |
| isNotSupported | `bool` | `false` | Informs you if mediastream isn't supported by your browser |
| isPermissionDenied | `bool` | `false` | Informs you if permission was granted/revoked to use the mediastream |
| setBeforeCapture | `() => void` | `() => () => null` | Allows you to calculate certain functions **before** capturing an image. Your function need two arrow functions (like in the default value), otherwise useState doesn't recognize it as a function |
| setAfterCapture | `() => void` | `() => () => null` | Allows you to calculate certain functions **after** capturing an image. Your function need two arrow functions (like in the default value), otherwise useState doesn't recognize it as a function |


### Camera Props

| prop | type | default | description |
|------|------|---------|-------|
| videoRef | `RefObject<HTMLVideoElement>` | required | Needed to display mediastream from useCapture hook |
| isAccessingCamera |  ``boolean`` | required | Needed to display camera if mediastream can be accessed | 
| objectFit? | `'cover' \| 'fill' \| 'contain' \| 'none' \| 'scale-down'` | `'cover` | Changes the cropping of the image |
| fullscreen? | `boolean?` | `true` | Allows you to disable the fullscreen functionality |
| flash | `Dispatch<SetStateAction<() => void>>` | required | You can pass it the `setBeforeCapture` value from useCapture to add a flash when capturing an image. Otherwise pass `() => () => void`
| children | Your camera interface | required | You can use the provided `CameraInterface` Component as a default |

### CameraInterface Props

| value | type | default | description |
|------|------|---------|-------|
| handleCapture | `() => void` | required | This function gets called when the capture button is pressed |
| image | `Blob \| HTMLCanvasElement \| string \| null` | Image is used to be displayed on the image detail button |
| openImage | `() => void` | required | This function gets called to open the image detail component |

## License

MIT
