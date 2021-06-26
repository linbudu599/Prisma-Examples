// TODO:
// Use Test-Only DataBase In Setup Files
describe("Prisma unit test example", () => {
  it("Create Todo", () => {
    $prisma.todo.create({
      data: {
        title: "瓦达西瓦卡面来打！",
      },
    });
  });
});
