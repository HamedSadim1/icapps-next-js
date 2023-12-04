import DeletePostModal from "./DeletePostModal";
import CommentModal from "./CommentModal";
import { IPost, UserRole } from "@/types";
import EditDoelButton from "./EditButton/EditDoelButton";
import { formatDate } from "@/lib";
import Image from "next/image";

interface Props {
  role: UserRole;
  post: IPost;
  setClickedPostId: (postId: string) => void;
  setIsPostModal: (isModalOpen: boolean) => void;
  handleCommentId: (postId: string) => void;
}

const Post = ({
  role,
  post,
  setClickedPostId,
  setIsPostModal,
  handleCommentId,
}: Props) => {
  return (
    <div key={post.id}>
      {/* Post */}
      <div className="flex flex-col rounded-lg mt-6">
        <div className="flex">
          <h2 className="text-xl font-bold text-[#002548]">{post.title}</h2>
          {/* Edit Button */}
          <EditDoelButton
            role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
            userRole={role}
            setUpdateGoalId={setClickedPostId}
            goal={post}
            setIsGoalModal={setIsPostModal}
          />
          {/* Delete button for post */}
          <DeletePostModal postId={post.id} post={post} />
        </div>
        <span className="text-gray-400 text-sm">
          {formatDate(post.createdAt)}
        </span>
        <p className="text-[#002548] text-base font-medium leading-relaxed mt-2">
          {post.body}
        </p>
      </div>
      {/* Comment Section */}
      <div className="flex flex-justify-between mt-3 mx-6">
        <div>
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start mb-3">
              {/* Comment Avatar */}
              <div className="avatar w-12 h-12 mr-3 mt-1">
                {comment.img && (
                  <Image
                    src={comment.img}
                    alt="User avatar"
                    className="rounded-full"
                    sizes="70%"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              {/* Comment Content */}
              <div>
                <h3 className="text-1 xl text-blue-400 mb-1">
                  {comment.commentatorName || ""}
                </h3>
                <div className="flex flex-col rounded-lg">
                  <p className="text-gray-600 text-base font-medium leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comment Button and Border Line */}
      <button
        onClick={() => handleCommentId(post.id)}
        type="button"
        className="mt-3"
      >
        <CommentModal />
      </button>
      {/* border */}
      <div className="border border-b-gray-500-400 mt-4"></div>
    </div>
  );
};

export default Post;
