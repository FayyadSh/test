'use client'
const Loading = ({ height = '[50vh]' } : {height?: string}) => {
  return (
    <div className={`h-${height} w-full flex justify-center items-center mx-auto`}>
      <div className="w-[344px] h-fit overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-lg shadow-[0_0_20px_2px] shadow-[#01d2cf] mx-auto">
        <div className="flex flex-col gap-4 relative z-10 rounded-lg overflow-hidden">
          <div className="flex flex-col font-mono text-base">
            <div className="flex items-center justify-between min-h-[40px] px-3 rounded-t-md bg-primary dark:bg-[#202425]/50">
              <div className="flex items-center gap-2 text-gray-200 font-semibold">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  height="18px"
                  width="18px"
                  className="mt-0.5 text-[#006adc]"
                >
                  <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
                </svg>
                Terminal
              </div>
      
              <button
                type="button"
                className="flex items-center justify-center p-1 border-[0.65px] border-gray-400 ml-auto rounded-md bg-[#202425] text-[#8e8e8e] cursor-pointer"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  height="16px"
                  width="16px"
                >
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                </svg>
              </button>
            </div>
      
            <div className="relative flex flex-col overflow-x-auto p-4 bg-background-secondary-color rounded-b-lg dark:bg-black text-white leading-5">
              <pre className="flex gap-2">
                <code className="text-[#575757]">-</code>
                <code className="text-[#01d2cf]">npx</code>
                <code className="relative cmd">
                  <span className="animate-typing">Loading...</span>
                  <span className="blink">_</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      
        <style jsx>{`
          .cmd::after {
            content: "_";
            display: inline-block;
            width: 1px;
            animation: blink 1s steps(1) infinite;
          }
          .cmd::before {
            content: attr(data-cmd);
            white-space: nowrap;
            animation: typing 2s steps(12) infinite;
          }
          .animate-typing {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            animation: typing 2s steps(12) infinite;
          }
          @keyframes typing {
            0%,
            100% {
              width: 0;
            }
            50% {
              width: 95px;
            }
          }
          @keyframes blink {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loading;
