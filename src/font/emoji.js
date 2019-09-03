let emojiSource;

export const registerEmojiSource = ({ url, format = 'png' }) => {
  emojiSource = { url, format };
};

export const getEmojiSource = () => emojiSource;

export default {
  registerEmojiSource,
  getEmojiSource,
};
