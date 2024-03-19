import { BellIcon } from "@/components/icons/BellIcon";
import { ChevronDown } from "@/components/icons/ChevronDown";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { QuestIcon } from "@/components/icons/QuestIcon";
import { LoginForm } from "./Form";

export const LoginView = async () => {
  return (
    <>
      <div className="flex w-full bg-[#121212] py-2 items-center justify-between">
        <div className="flex flex-row items-center px-4 gap-5">
          <img
            width="82"
            height="36"
            className="logo-img undefined"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAABICAQAAADSOpYzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfmBwMNKhI4Vg/yAAABMklEQVR42u3aQW6DMBBAUZyT5eSFE/RInS5psOKx8Scq0n9ZNXjA+VE3VpZFkiRJkiShYo0rrYPPWyf3+3VYXZL138nTuudLxLVfVCmHrcXY+uqjteejPF7/XH5G1teXe+ebt1E/Q0IMCTEkxJAQQ0IMCTEkxJAQQ0IMCTEkxJCQ+4XcBq+Orj87n54oPlv3iWc2Xk3A55tzZs8rd+l55OT54PB5ZLrhMjd/2M3keeXufv/a/5QhIYaEGBJiSIghIYaEGBJiSIghIYaEGBJiSEgaMjtG+/B+tw/f8eVqlPq1X7xYlX5wfTXfPj/095Hv1tdfRPLJ/X3kvRkSYkiIISGGhBgSYkiIISGGhBgSYkiIISGGhDwuOOH7a+t4p//qmflticYrf946OS9JkiRJkk75BUgSur6QrNyYAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA3LTAzVDEzOjQyOjE4KzAwOjAwKpbwNQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNy0wM1QxMzo0MjoxOCswMDowMFvLSIkAAAAASUVORK5CYII="
            alt="OKX - Leading Cryptocurrency Exchange"
            title="OKX"
          />

          <span className="text-sm font-medium text-white flex flex-row items-center gap-2 cursor-pointer">
            Buy crypto <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            Discover <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            Trade <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            Grow <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            Build <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            Institutional <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            Learn <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            More <ChevronDown />
          </span>
        </div>

        <div className="flex flex-row gap-2 items-center px-6">
          <span className="text-white cursor-pointer">Log in</span>

          <div className="text-white px-2 py-1 flex items-center justify-center border border-zinc-200 rounded-[20px] cursor-pointer">
            Sign up
          </div>

          <div className="flex flex-row gap-4 ml-6">
            <DownloadIcon />
            <BellIcon />
            <QuestIcon />
            <GlobeIcon />
          </div>
        </div>
      </div>
      <LoginForm />
    </>
  );
};
