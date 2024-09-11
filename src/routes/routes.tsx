import { createBrowserRouter } from "react-router-dom";

import Code from "@/pages/code/code";
import Data from "@/pages/data/data";
import Main from "@/pages/main/main";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children:[
        {
          path:"/data",
          element:<Data></Data>
        },{
          path:"/code",
          element:<Code></Code>
        }
      ]
    },
])

export default router;