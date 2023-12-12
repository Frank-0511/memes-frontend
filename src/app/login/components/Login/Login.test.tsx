import {
  SessionProvider,
  SessionProviderProps,
  getSession,
} from "next-auth/react";
import { act, render } from "@testing-library/react";

import Login from ".";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  getSession: jest.fn(),
}));

const useRouterMock = useRouter as jest.Mock;

jest.mock("next/navigation");

describe("Login Component", () => {
  it("redirects to the root path when the status is authenticated", async () => {
    const pushMock = jest.fn();

    useRouterMock.mockReturnValue({
      push: pushMock,
    });

    const authenticatedSession: SessionProviderProps["session"] = {
      user: {
        name: "John Doe",
        email: "example@example.com",
        token: "123456789",
      },
      expires: "1",
    };

    (getSession as jest.Mock).mockReturnValueOnce(
      Promise.resolve(authenticatedSession)
    );

    render(
      <SessionProvider session={authenticatedSession}>
        <Login />
      </SessionProvider>
    );

    await act(async () => {});

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
