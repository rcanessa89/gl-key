/**
 * This function return a boolean in true
 * if the current device if a mobile device
 * @return {boolean} if is mobile device
 */
export default (): boolean => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
