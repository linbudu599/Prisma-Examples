declare global {
  const $prisma: typeof mockedPrisma;
  namespace NodeJS {
    interface Global {
      $prisma: typeof mockedPrisma;
    }
  }
}
