import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token
    },
  },
})

export const config = {   
  matcher: [
    "/dashboard/:path*", 
    "/blogs/add", 
    "/blogs/edit/:path*",
    "/blogs/delete/:path*",
  ]
}