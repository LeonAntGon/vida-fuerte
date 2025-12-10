import * as React from "react"

function mergeClasses(base, extra) {
  return extra ? `${base} ${extra}` : base
}

export function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={mergeClasses(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={mergeClasses(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={mergeClasses("leading-none font-semibold", className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={mergeClasses("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={mergeClasses(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={mergeClasses("px-6", className)}
      {...props}
    />
  )
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={mergeClasses(
        "flex items-center px-6 [.border-t]:pt-6",
        className
      )}
      {...props}
    />
  )
}
