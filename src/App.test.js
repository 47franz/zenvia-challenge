import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import waitUntil from "async-wait-until";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

it("Testa loading", async () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  await waitUntil(() => instance.state.characters !== []);
  const { getByText } = render(<App />);
  const element = getByText(/carregando/i);
  expect(element).toBeTruthy();
});
