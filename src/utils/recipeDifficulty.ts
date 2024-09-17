const difficultyToText = (difficulty: number): string => {
  switch (difficulty) {
    case 1:
      return 'Fácil';
    case 2:
      return 'Media';
    case 3:
      return 'Difícil';
    default:
      return '';
  }
}

export default difficultyToText;
