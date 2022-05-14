/** @jsxImportSource @emotion/react */
import "twin.macro";

import React from "react";
export const Skeleton = () => {
  return (
    <div tw="border border-gray-200 shadow-xl rounded-md p-4 max-w-sm width[330px] mx-auto height[400px]">
      <div tw="animate-pulse flex space-x-4">
        <div tw="flex-1 space-y-6 py-1">
          <div tw="h-48 bg-gray-200 rounded"></div>
          <div tw="space-y-3">
              <div tw="h-4 bg-gray-200 rounded col-span-1"></div>
              <div tw="h-8 bg-gray-200 rounded col-span-2"></div>
            <div tw="grid grid-cols-3 gap-4">
                <div tw="h-7 bg-gray-200 rounded col-span-1"></div>
                <div tw="h-7 bg-gray-200 rounded col-span-1"></div>
                <div tw="h-7 bg-gray-200 rounded col-span-1"></div>
            </div>
            <div tw='flex justify-between'>
                <div tw="h-7 w-32 bg-gray-200 rounded"></div>
                <div tw='flex space-x-3'>
                    <div tw="h-7 w-16 bg-gray-200 rounded col-span-1"></div>
                    <div tw="h-7 w-16 bg-gray-200 rounded col-span-1"></div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
