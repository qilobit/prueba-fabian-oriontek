export const formatDate = (date: string) => {
  const parts = date.split('T');
  if(parts[0]){
    return parts[0];
  }
  return 'Invalid date';
}