import { useMemo } from 'react';
import { SceneMap } from 'react-native-tab-view';

// Hook to generate routes and renderScene dynamically
export function useMultiStepFormConfig(steps: { key: number; title: string; component: React.ComponentType<any> }[]) {
  return useMemo(() => {
    const routes = steps.map((step) => ({
      key: step.title,
      title: step.title,
    }));

    const renderScene = SceneMap(
      steps.reduce((acc, step) => {
        acc[step.title] = step.component;
        return acc;
      }, {} as { [key: string]: React.ComponentType<any> })
    );

    return { routes, renderScene };
  }, [steps]);
}
