import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { LoginForm } from ".";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");
const useRouterMock = useRouter as jest.Mock;
const pushMock = jest.fn();
useRouterMock.mockReturnValue({
  push: pushMock,
});

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("LoginForm", () => {
  it("validates required fields and disabled button on Login", async () => {
    render(<LoginForm />);

    jest.mock("next-auth/react", () => ({
      signIn: jest.fn(() => Promise.resolve({})),
    }));
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
      expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123#" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });
});
