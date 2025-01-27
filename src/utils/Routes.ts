// AUTH PAGES
export const registerRoute = "/register";
export const loginRoute = "/login";
export const otpVerifyRoute = "/register/verify";
export const selectRoleRoute = "/register/select-role";
export const userDetailsRoute = "/register/user-details";
export const spaceOwnerDetailsRoute = "/register/space-owner-details";
export const profilePictureRoute = "/register/profile-picture";
export const forgotPasswordRoute = "/forgot-password";
export const linkSentRoute = "/forgot-password/link-sent";
export const resetSuccessRoute ="/reset-password/reset-success";

// Nav Routes
export const listingPage = "/listing";

// Search Routes
export const spacesPage = "/spaces";
export const spaceSlugPage = (slug: string, id: string) => `/spaces/${slug}?id=${id}`;
export const bookingRoute = (slug: string, id: string) => `/booking/${id}?id=${slug}`;

// User Dashboard Routes
export const myReservationsRoute = "/dashboard/my-reservations";