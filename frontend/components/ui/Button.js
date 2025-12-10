import React from "react";

const Button = ({
  children = "Click me",
  onClick,
  href,               // si existe → será un <a>
  as,
  color = "#f97316",
  textColor = "#fff",
  radius = "10px",
  className = "",
  style = {},
  ...props
}) => {
  const baseStyle = {
    backgroundColor: color,
    color: textColor,
    border: "none",
    borderRadius: radius,
    fontWeight: 600,
    fontSize: "0.95rem",
    lineHeight: 1,
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
    transition:
      "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease",
    textDecoration: "none", // importante para <a>
    display: "flex",
    alignItems: "center",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 10px 22px rgba(0,0,0,0.15)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.1)";
  };

  const handleFocus = (e) => {
    e.currentTarget.style.outline = "3px solid rgba(249,115,22,0.25)";
    e.currentTarget.style.outlineOffset = "3px";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.outline = "none";
  };

  //Si tiene href → se renderiza como <a>
  //Si no tiene href → se renderiza como <button>
  const Tag = as || (href ? "a" : "button");

  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      style={{ ...baseStyle, ...style }}
      type={Tag === "button" ? "button" : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Button;
