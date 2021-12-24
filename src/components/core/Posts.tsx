// @ts-ignore
import UserImage from "../../static/user.png";
// @ts-ignore
import UserPostImage from "../../static/user_post.png";

export default function DisplayPosts() {
  const style: any = {
    marginTop: "9px",
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr key="post_1">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={UserImage}
                            alt=""
                          />
                        </div>
                        <div className="ml-4 font-display">
                          <div className="text-base text-coolestGray-900 font-bold leading-5">
                            Sri krishnan
                          </div>
                          <div
                            className="text-base text-coolestGray-900 font-normal leading-5"
                            style={style}>
                            Hello Robert! Let’s get started
                          </div>
                          <div className="">Post Reaction</div>
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
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr key="post_1">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={UserImage}
                            alt=""
                          />
                        </div>
                        <div className="ml-4 font-display">
                          <div className="text-base text-coolestGray-900 font-bold leading-5">
                            Sri krishnan
                          </div>
                          <div
                            className="text-base text-coolestGray-900 font-normal leading-5"
                            style={style}>
                            <img src={UserPostImage} className="w-56 h-56" />
                          </div>
                          <div className="">Post Reaction will come here</div>
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
