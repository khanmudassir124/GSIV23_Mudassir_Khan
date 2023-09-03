import React from "react";
interface BodyProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}
const Body: React.FC<BodyProps> = ({ children, ...props }) => {
  return (
    <section className="h-[100vh] overflow-y-auto bg-white p-5 pt-20">
      <div className="mx-auto max-w-screen-2xl" {...props}>
        {children}
      </div>
    </section>
  );
};

export default Body;
