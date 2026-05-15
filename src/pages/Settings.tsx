import Checkbox from '../components/atoms/checkbox/Checkbox'
import Slider from '../components/atoms/slider/Slider'
import '../App.css'

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--color-white)',
      border: '1px solid var(--color-slate-200)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-sm)',
      marginTop: 'var(--space-6)',
    }}>
      <h3 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-slate-900)' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function Settings() {
  return (
    <>
      <h1>Settings</h1>

      <SettingsGroup title="Notifications">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Checkbox label="Email notifications"   defaultChecked size="md" />
          <Checkbox label="Weekly summary digest" defaultChecked size="md" />
          <Checkbox label="Push notifications"    size="md" />
          <Checkbox label="Beta feature previews" size="md" />
          <Checkbox label="Marketing emails"      size="sm" />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Display">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '400px' }}>
          <Slider label="UI Scale"    defaultValue={100} min={80}  max={120} size="md" />
          <Slider label="Brightness"  defaultValue={75}  min={0}   max={100} size="md" />
          <Slider label="Font Size"   defaultValue={16}  min={12}  max={24}  size="sm" />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Audio">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '400px' }}>
          <Slider label="Volume"       defaultValue={60} min={0} max={100} size="md" />
          <Slider label="Notification" defaultValue={40} min={0} max={100} size="sm" />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Privacy">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Checkbox label="Share usage analytics" defaultChecked size="md" />
          <Checkbox label="Allow crash reports"   defaultChecked size="md" />
          <Checkbox label="Personalised ads"      size="sm" />
        </div>
      </SettingsGroup>
    </>
  )
}
