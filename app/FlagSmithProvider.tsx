// "use client";
// // export default function FlagSmithProvider({ }) { third }
// import flagsmith from "flagsmith/isomorphic";
// import { FlagsmithProvider } from "flagsmith/react";

// export default async function FlagSmithProvider({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   await flagsmith.init({
//     // fetches flags on the server and passes them to the App
//     environmentID: "TmQCzVJqriWe9USBFUFLyf",
//   });

//   return (
//     <FlagsmithProvider
//       serverState={flagsmith.getState()}
//       options={{
//         environmentID: "TmQCzVJqriWe9USBFUFLyf",
//       }}
//       flagsmith={flagsmith}
//     >
//       <>{children}</>
//     </FlagsmithProvider>
//   );
// }
