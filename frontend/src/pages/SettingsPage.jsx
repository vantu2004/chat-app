import { useThemeStore } from "../store/useThemeStore.js";
import { THEMES } from "../constants/index.js";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-full flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-4xl card bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
        <div className="card-body p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-2">Theme</h1>
          <p className="text-center text-gray-500 mb-8">
            Choose a theme for your chat interface
          </p>

          {/* Grid theme selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-3 rounded-xl border transition transform hover:scale-105 
                  ${
                    theme === t
                      ? "border-primary ring-2 ring-primary"
                      : "border-gray-700"
                  }`}
              >
                {/* Preview box */}
                <div
                  data-theme={t}
                  className="w-full h-16 rounded-lg flex overflow-hidden"
                >
                  <div className="flex-1 bg-primary"></div>
                  <div className="flex-1 bg-secondary"></div>
                  <div className="flex-1 bg-accent"></div>
                  <div className="flex-1 bg-neutral"></div>
                </div>
                <p className="mt-2 text-sm font-medium text-center capitalize">
                  {t}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
