import ClapsIcon from "../icons/ClapsIcon";
import LoveIcon from "../icons/LoveIcon";
import ThumbsUpIcon from "../icons/ThumbsUpIcon";

export default function Table({ list }: { list: any[] }) {
  console.log("my list", list);
  function getIconMapping(iconName: string) {
    switch (iconName) {
      case "ThumbsUpIcon":
        return <ThumbsUpIcon />;
      case "LoveIcon":
        return <LoveIcon />;
      case "ClapsIcon":
        return <ClapsIcon />;
    }
  }

  return (
    <div className="flex flex-col font-display h-80 overflow-scroll">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((data) => (
                  <tr key={data.email}>
                    <td className="pl-3.5 pt-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-5 w-5 rounded-full box-border"
                            src={data.avatar}
                            alt=""
                          />
                        </div>
                        <div className="">
                          <div className="text-sm text-gray-500">
                            {getIconMapping(data.emoji.name)}
                            <div className="text-sm font-medium text-gray-900 invisible">
                              -
                            </div>
                          </div>
                        </div>
                        <div className="pl-3">
                          <div className="text-base text-coolestGray-200 font-normal not-italic leading-5">
                            {`${data.first_name} ${data.last_name}`}
                          </div>
                          <div className="text-sm font-medium text-gray-900 invisible">
                            -
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
