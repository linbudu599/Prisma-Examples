// TODO:
// Use Test-Only DataBase In Setup Files
describe("Prisma unit test example", () => {
  it("Create Todo", () => {
    // @ts-ignore
    $prisma.todo.create({
      data: {
        title: "瓦达西瓦卡面来打！",
      },
    });
  });
});
