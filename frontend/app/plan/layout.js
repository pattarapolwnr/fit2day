import { Providers } from "./provider";

export const metadata = {
  title: "FIT2DAY",
};

export default function Layout({ children }) {
  return <Providers>{children}</Providers>;
}
