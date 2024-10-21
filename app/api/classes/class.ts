import { rLoogBookUrl } from "@/app/lib/endpoints";
import { get } from "@/app/lib/util";
import { Diagnostic } from "@/app/lib/util-logger";


export const getClasses = async (id: string) => {
    try {
      const resp = await get(
        `${rLoogBookUrl}/api/v1/ClassSessions/GetClassSessions/${id}/Course`
      );
      const data = resp.data;
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON GET, returning", err);
  
      console.error(err);
    }
  };
