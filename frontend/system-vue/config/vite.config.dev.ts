import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { viteMockServe } from 'vite-plugin-mock';
import baseConfig from './vite.config.base';
// https://vite.dev/config/
/**
 * 合并开发环境的配置
 */
export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true
      },
      proxy: {
        '/icoder-gateway': {
          target: 'http://10.195.157.34:5006/', // 替换为你的后端地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/icoder-gateway/, '')
        }
      }
    },
    plugins: [
      eslint({
        cache: false,
        include: ['../src/**/*.ts', '../src/**/*.tsx', '../src/**/*.vue'],
        exclude: ['node_modules']
      }),
      viteMockServe({
        // default
        mockPath: '../src/mock', // mock文件所在文件夹
        enable: false, // 是否应用于生产
        watchFiles: true // 监视文件更改 这样更改mock的时候，不需要重新启动编译
      })
    ]
  },
  baseConfig
);
