import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "PromptMania",
  description: "Best place to get the AI prompts.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <menu className="app">
            <Nav />
            {children}
          </menu>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
