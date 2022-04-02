# react-browsercam

A fully responsive camera component for React.

Browser compatibility:

- [Fullscreen API](https://caniuse.com/?search=fullscreen)
- [MediaStream API](https://caniuse.com/?search=Mediastream)

Note: HTTPS is needed to access the camera.

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

### Props

| prop | type | default | description |
|------|------|---------|-------|
| objectFit | `'cover' | 'fill' | 'contain' | 'none' | 'scale-down'` | `'cover` | Changes the cropping of the image |
| videoConstraints | `MediaStreamConstraints` | `audio: false, <br>video: { <br>width: { ideal: 4096 }, <br>height: { ideal: 4096 }, <br> facingMode: 'environment }' | MediaStreamConstraints(s) for the video |
| imageFormat | `'image/webp' | 'image/png' | 'image/jpeg'` | `'image/jpeg'` | Choose image type |
| quality | `number?` | `0.91` | Select image compression rate |

### Methods


## License

MIT
