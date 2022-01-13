import ReactionsOnPost from "../_partials/ReactionsOnPost";
import { ServiceTypes } from "../../types";
// @ts-ignore
import UserImage from "../../static/user.png";
// @ts-ignore
import UserPostImage from "../../static/user_post.png";

export default function DisplayPosts({
  usersList,
  reactionsList,
  userContentReactionMapping,
}: {
  usersList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  userContentReactionMapping: ServiceTypes.UserContentReaction[];
}) {
  const style: any = {
    marginTop: "9px",
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr key="post_1">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="cursor-pointer flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={UserImage} alt="" />
                        </div>
                        <div className="ml-4 font-display">
                          <div className="cursor-pointer">
                            <div className="text-base text-coolestGray-900 font-bold leading-5">
                              Sri krishnan
                              <span className="font-display font-normal text-xs text-coolestGray-400 ml-2">4:04 PM</span>
                            </div>
                            <div className="text-base text-coolestGray-900 font-normal leading-5" style={style}>
                              Hello Robert! Let’s get started
                            </div>
                          </div>
                          <div>
                            <ReactionsOnPost
                              usersList={usersList}
                              reactionsList={reactionsList}
                              userContentReactionMapping={userContentReactionMapping}
                              contentId={1}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr key="post_1">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="cursor-pointer flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={UserImage} alt="" />
                        </div>
                        <div className="ml-4 font-display">
                          <div className="cursor-pointer">
                            <div className="text-base text-coolestGray-900 font-bold leading-5">
                              Sri krishnan
                              <span className="font-display font-normal text-xs text-coolestGray-400 ml-2">4:08 PM</span>
                            </div>
                            <div className="text-base text-coolestGray-900 font-normal leading-5" style={style}>
                              <img src={UserPostImage} className="w-56 h-56" />
                            </div>
                          </div>
                          <div>
                            <ReactionsOnPost
                              usersList={usersList}
                              reactionsList={reactionsList}
                              userContentReactionMapping={userContentReactionMapping}
                              contentId={2}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
