export const urlToFile = async (blobUrl: any, fileName : string) => {
  const response = await fetch(blobUrl)
  const blob = await response.blob()
  
  return new File([blob], fileName, { type: blob.type });
}

export const fileToBuffer = async (file: File): Promise<Buffer> => {
  const bytes = await file.arrayBuffer()
  const bufferFile = Buffer.from(bytes)

  return bufferFile
}