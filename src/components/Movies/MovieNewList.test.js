import renderer from "react-test-renderer";

import MovieNewList from "./MovieNewList";

describe("movies list", () => {
  
//   test("renders MovieNewList", () => {
//     render(<MovieNewList />);
//   });
  
});

describe("SnapShot matches", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<MovieNewList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
