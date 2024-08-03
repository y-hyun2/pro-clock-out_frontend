import styled from "styled-components";

export const DiaryContainer = styled.div`
  border: 1px solid #7a7ee3;
  border-radius: 8px;
  width: 1128px;
  height: 640px;
  padding: 20px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  top: calc(300px + 30px);
  //   margin-left: auto;
  //   right: 69px;
  left: 425px;
`;

export const DiaryTitle = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export const DiaryBlock = styled.div`
  border-top: 2px solid #7a7ee3;
  margin-top: 10px;
  width: 210px;
`;

export const DiaryContent = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
`;

export const ImageContainer = styled.div`
  margin-top: 6px;
  text-align: center;
`;

export const AddImageButton = styled.label`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const AddImageInput = styled.input`
  display: none;
`;

export const PictureImage = styled.img`
  width: 24px;
  height: 24px;
  border: none;
`;
