import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Comments from "src/";

describe("Comments", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("displays a loading message", () => {
    render(<Comments />, node, () => {
      expect(node.innerHTML).toContain("正在加载评论");
    });
  });
});
