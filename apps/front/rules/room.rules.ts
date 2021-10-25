export const roomRules = {
  validNameLength: (v: string): string | boolean=> {
    return v.length >= 6 && v.length <= 25 || 'トークルーム名は6文字以上25文字以下に設定してください。';
  }
};
