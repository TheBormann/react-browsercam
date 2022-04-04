/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

//import { preventParentOnClick } from '../../../core/wrapper/prevent_parent_on_click';


type Props = {
  images: Array<Blob>,
  removeImage: (arg0: number) => void,
  visible: boolean,
  isDetailOpen: (arg0: boolean) => void,
}

const ImgListPopUp = ({images, removeImage, visible, isDetailOpen}: Props) => {

  useEffect(() => {
    if (images.length === 0) {
      isDetailOpen(false);
    }
  }, [images]);

  return (
    <div className={`${visible ? 'visible' : 'invisible'} opacity-${visible ? '100' : '0'} fixed z-20 inset-0 p-5 bg-black bg-opacity-75 ease-in-out flex-auto justify-center items-center`}
      onClick={(e) => {
        isDetailOpen(false);
      }}>
      <div className='absolute '
        sx={{
          position: 'absolute',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={preventParentOnClick(() => {})}>
        <IconButton
          sx={{
            zIndex: 12,
            //alignSelf: 'end',
            //mt: 1,
            //mr: 1,
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: 'white',
            '&:hover': {
              backgroundColor: 'lightgray'
            }
          }}
          onClick={() => props.setIsDetailOpen(false)}>
          <CloseRounded />
        </IconButton>
        <ImageList
          cols={1}
          sx={{
            margin: 1,
            maxHeight: '80vh',
            maxWidth: '80vw',
            overflowY: 'scroll',
            borderRadius: 5
          }}>
          {images.map((img, index) => (
            <ImageListItem
              key={index}
              sx={{
                display: 'flex'
              }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  zIndex: 12,
                  alignSelf: 'start',
                  mt: 0.5,
                  ml: 0.5,
                  bgcolor: 'red',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkred'
                  }
                }}
                onClick={() => removeImage(index)}>
                <Delete />
              </IconButton>
              <Box
                sx={{
                  scale: 0.5,
                  borderRadius: 5,
                  width: '100%',
                  maxWidth: '80vw',
                  maxHeight: '80vh',
                  objectFit: 'contain'
                }}
                component="img"
                loading="lazy"
                alt={'Not loading!'}
                src={URL.createObjectURL(img.src)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default ImgListPopUp;
