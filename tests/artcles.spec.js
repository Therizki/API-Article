const request = require("supertest");
const jwt = require("jsonwebtoken");
const { app } = require("../server");
const config = require("../config");
const Article = require("../api/articles/articles.schema"); // Make sure this import is correct
const mockingoose = require("mockingoose");

describe("Testing Article API", () => {
  let token;
  const USER_ID = 1;
  const MOCK_ARTICLE_ID = 1;
  const MOCK_DATA = [
    {
      _id: MOCK_ARTICLE_ID,
      title: "Test Article",
      content: "This is a test article",
      user: USER_ID,
      status: "draft",
    },
  ];
  const MOCK_DATA_CREATED = {
    title: "New Article",
    content: "Content of new article",
    user: USER_ID,
    status: "draft",
  };

  beforeEach(() => {
    const user = {
      _id: USER_ID,
      name: "ana",
      email: "test@example.com", // Fill in with a valid email
      password: "password123", // Fill in with a valid password
      role: "admin", // or "member", based on your schema
    };

    // Generate JWT token for the mock user
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);

    // Mock the Article model methods
    mockingoose(Article).toReturn(MOCK_DATA, "find");
    mockingoose(Article).toReturn(MOCK_DATA[0], "findOne");
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
  });

  // test("[Articles] Get All", async () => {
  //   const res = await request(app)
  //     .get("/api/articles")
  //     .set("x-access-token", token);
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBeGreaterThan(0);
  // });

  test("[Articles] Create Article", async () => {
    jest.setTimeout(10000);

    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_DATA_CREATED)
      .set("x-access-token", token);

      

    
    expect(res.status).toBe(201);
    // expect(res.body.title).toBe(MOCK_DATA_CREATED.title);
  });

  test("[Articles] Update Article", async () => {
    const updatedTitle = "Updated Article";
    const res = await request(app)
      .put(`/api/articles/${MOCK_ARTICLE_ID}`)
      .send({ title: updatedTitle })
      .set("x-access-token", token);
      // console.log();
    expect(res.status).toBe(200);
    // expect(res.body.title).toBe(updatedTitle);
  });

  test("[Articles] Delete Article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${MOCK_ARTICLE_ID}`)
      .set("x-access-token", token);
    expect(res.status).toBe(204);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
