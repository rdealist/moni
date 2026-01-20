"use client";

import { Shell } from "@/components/layout/shell";
import { cn } from "@moni/ui/lib/utils";
import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Plug,
  CreditCard,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  Check,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const settingsSections = [
  {
    id: "account",
    icon: User,
    title: "Account",
    description: "Profile and account settings",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    description: "Alerts and notification preferences",
  },
  {
    id: "appearance",
    icon: Palette,
    title: "Appearance",
    description: "Theme and display settings",
  },
  {
    id: "privacy",
    icon: Shield,
    title: "Privacy & Security",
    description: "Security and data privacy",
  },
  {
    id: "data",
    icon: Database,
    title: "Data Management",
    description: "Import, export, and backup",
  },
  {
    id: "integrations",
    icon: Plug,
    title: "Integrations",
    description: "Connected services and plugins",
  },
  {
    id: "currency",
    icon: Globe,
    title: "Currency & Region",
    description: "Display currency and locale",
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Billing",
    description: "Subscription and payments",
  },
];

const currencies = ["CNY (¥)", "USD ($)", "EUR (€)", "GBP (£)", "JPY (¥)"];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("appearance");
  const { theme, setTheme } = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState("CNY (¥)");
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    dailySummary: true,
    weeklyReport: false,
    marketNews: false,
  });

  return (
    <Shell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your preferences and account settings</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Appearance Section */}
            {activeSection === "appearance" && (
              <div className="space-y-6 page-enter">
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Theme</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose how Moni looks to you. Select a single theme, or sync with your system.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id as "light" | "dark" | "system")}
                        className={cn(
                          "relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                          theme === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        <option.icon className={cn("h-6 w-6", theme === option.id ? "text-primary" : "text-muted-foreground")} />
                        <span className={cn("text-sm font-medium", theme === option.id ? "text-primary" : "text-muted-foreground")}>
                          {option.label}
                        </span>
                        {theme === option.id && (
                          <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Display Density</h3>
                  <div className="space-y-3">
                    {["Comfortable", "Compact", "Spacious"].map((density) => (
                      <label
                        key={density}
                        className="flex items-center justify-between p-3 rounded-xl border border-border/50 cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-foreground">{density}</span>
                        <input
                          type="radio"
                          name="density"
                          defaultChecked={density === "Comfortable"}
                          className="h-4 w-4 text-primary"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="space-y-6 page-enter">
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { id: "priceAlerts", label: "Price Alerts", description: "Get notified when assets hit target prices" },
                      { id: "dailySummary", label: "Daily Summary", description: "Daily portfolio performance summary" },
                      { id: "weeklyReport", label: "Weekly Report", description: "Comprehensive weekly analysis" },
                      { id: "marketNews", label: "Market News", description: "Breaking news about your holdings" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border/50"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.id]: !prev[item.id as keyof typeof prev],
                            }))
                          }
                          className={cn(
                            "relative h-6 w-11 rounded-full transition-colors",
                            notifications[item.id as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                              notifications[item.id as keyof typeof notifications] && "translate-x-5"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Currency Section */}
            {activeSection === "currency" && (
              <div className="space-y-6 page-enter">
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Display Currency</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose the currency used to display portfolio values.
                  </p>
                  <div className="space-y-2">
                    {currencies.map((currency) => (
                      <button
                        key={currency}
                        onClick={() => setSelectedCurrency(currency)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-xl border transition-all",
                          selectedCurrency === currency
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:bg-muted/30"
                        )}
                      >
                        <span className="text-sm font-medium text-foreground">{currency}</span>
                        {selectedCurrency === currency && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Number Format</h3>
                  <div className="space-y-3">
                    {["1,234.56", "1.234,56", "1 234,56"].map((format) => (
                      <label
                        key={format}
                        className="flex items-center justify-between p-3 rounded-xl border border-border/50 cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        <span className="text-sm font-mono text-foreground">{format}</span>
                        <input type="radio" name="format" defaultChecked={format === "1,234.56"} className="h-4 w-4" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Data Management Section */}
            {activeSection === "data" && (
              <div className="space-y-6 page-enter">
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Import & Export</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Import from CSV</p>
                        <p className="text-xs text-muted-foreground">Import transactions from a CSV file</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Export Data</p>
                        <p className="text-xs text-muted-foreground">Download all your data as JSON or CSV</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Create Backup</p>
                        <p className="text-xs text-muted-foreground">Save a complete backup of your data</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-6">
                  <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete all your data. This action cannot be undone.
                  </p>
                  <button className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">
                    Delete All Data
                  </button>
                </div>
              </div>
            )}

            {/* Placeholder for other sections */}
            {!["appearance", "notifications", "currency", "data"].includes(activeSection) && (
              <div className="rounded-2xl bg-card border border-border/50 p-12 text-center page-enter">
                <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const section = settingsSections.find((s) => s.id === activeSection);
                    if (section) {
                      const Icon = section.icon;
                      return <Icon className="h-6 w-6 text-muted-foreground" />;
                    }
                    return null;
                  })()}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {settingsSections.find((s) => s.id === activeSection)?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  This section is coming soon. We&apos;re working on it!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
