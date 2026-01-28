/**
 * Utility function to get the base path from environment variable
 * This ensures consistent base path usage across the application
 * Ensures the base path starts with / if provided
 */
export function getBasePath(): string {
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Ensure it starts with / if provided and not empty
  if (envBasePath && !envBasePath.startsWith('/')) {
    return `/${envBasePath}`;
  }
  return envBasePath;
}

/**
 * Prepend base path to an asset path
 * Use this for img src, link href, etc. that need basePath
 * @param path - The asset path (e.g., '/assets/images/logo.png')
 * @returns Path with basePath prepended (e.g., '/althean-nextjs/assets/images/logo.png')
 */
export function withBasePath(path: string): string {
  const basePath = getBasePath();
  if (!basePath) return path;
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash from basePath if present
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${cleanBasePath}${cleanPath}`;
}

/**
 * Get the full URL with base path (for server-side use)
 * @param path - The path to create URL for
 * @returns Full URL with base path
 */
export function getFullUrl(path: string): string {
  const basePath = getBasePath();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBaseUrl}${cleanBasePath}${cleanPath}`;
}

