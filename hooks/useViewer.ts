import { getQuery } from "@/lib/client"
import viewer from "@/queries/viewer.gql"
import { user } from "@prisma/client";
import React from "react";

export const getViewer = async () => {
    const { data, error } = await getQuery<{ viewer: user }>(viewer);
    return { data, error }
}

export const useViewer = async () => {
    const { data, error } = await React.useMemo(() => getViewer(), [])
    return { data, error }
}

export default useViewer