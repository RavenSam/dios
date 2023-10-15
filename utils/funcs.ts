export const intials = (fullName: string | undefined) =>
   fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
