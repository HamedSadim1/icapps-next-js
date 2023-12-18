import { useMutation, useQueryClient } from "react-query";

function useDeleteDocument(documentId: string) {
  console.log(
    "🚀 ~ file: useDeleteDocument.ts:4 ~ useDeleteDocument ~ documentId:",
    documentId
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return fetch(`http://localhost:3000/api/document/${documentId}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok");
        }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stagair");
      
      },
      onError: (error) => {
      
      },
    }
  );
  return mutation;
}

export default useDeleteDocument;
