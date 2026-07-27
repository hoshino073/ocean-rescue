import { motion } from 'framer-motion';
import type { AnimalCase } from '../../types/animal';
import { DeviceIcon } from './DeviceIcon';

interface DeviceSelectProps {
  animalCase: AnimalCase;
  onSelect: (deviceId: string) => void;
}

/** Step 1 of the fitting activity: pick the right device for this animal. */
export function DeviceSelect({ animalCase, onSelect }: DeviceSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <h3 className="mb-1 text-lg font-semibold text-foam">
        Which device suits {animalCase.name}?
      </h3>
      <p className="mb-4 text-sm text-foam/70">
        Pick the device that matches the injury described in the case notes.
      </p>

      <ul className="grid gap-3 sm:grid-cols-3">
        {animalCase.deviceOptions.map((device) => (
          <li key={device.id}>
            <button
              onClick={() => onSelect(device.id)}
              className="group flex h-full w-full flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-4 text-center transition-colors hover:border-lagoon/60 hover:bg-lagoon/15"
            >
              <DeviceIcon
                deviceId={device.id}
                className="h-14 w-14 text-lagoon transition-transform group-hover:scale-110"
              />
              <span className="text-sm font-semibold text-foam">{device.name}</span>
              <span className="text-xs leading-relaxed text-foam/60">{device.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
