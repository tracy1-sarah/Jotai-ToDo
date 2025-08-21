import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('http://localhost:5173');
    await page.waitForSelector('h1:has-text("My Tasks")');
  });

  test('should display the main app interface', async ({ page }) => {
    await expect(page.locator('h1:has-text("My Tasks")')).toBeVisible();
    await expect(page.locator('input[placeholder="Add a new task..."]')).toBeVisible();
    await expect(page.locator('button:has-text("Add")')).toBeVisible();
    await expect(page.locator('button:has-text("Clear all tasks")')).toBeVisible();
    await expect(page.locator('text=0 tasks left')).toBeVisible();
  });

  test('should add a new task', async ({ page }) => {
    const taskText = 'Buy groceries';
    await page.fill('input[placeholder="Add a new task..."]', taskText);
    await page.click('button:has-text("Add")');
    await expect(page.locator(`text=${taskText}`)).toBeVisible();
    await expect(page.locator('text=1 tasks left')).toBeVisible();
    await expect(page.locator('input[placeholder="Add a new task..."]')).toHaveValue('');
  });

  test('should add multiple tasks', async ({ page }) => {
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    for (const task of tasks) {
      await page.fill('input[placeholder="Add a new task..."]', task);
      await page.click('button:has-text("Add")');
    }
    for (const task of tasks) {
      await expect(page.locator(`text=${task}`)).toBeVisible();
    }
  });

  test('should mark task as completed', async ({ page }) => {
    await page.fill('input[placeholder="Add a new task..."]', 'Complete this task');
    await page.click('button:has-text("Add")');
    await page.click('input[type="checkbox"]');
    await expect(page.locator('text=0 tasks left')).toBeVisible();
  });

  test('should edit a task', async ({ page }) => {
    const originalText = 'Buy Groceries';
    const editedText = 'Buy Groceries and Cook Dinner';
    
    await page.fill('input[placeholder="Add a new task..."]', originalText);
    await page.click('button:has-text("Add")');
    await page.click('button[aria-label="Edit task"]');
    await page.fill('input[type="text"]', editedText);
    await page.click('button[aria-label="Save edit"]');
    
    await expect(page.locator(`text=${editedText}`)).toBeVisible(); //check later
    await expect(page.locator(`text=${originalText}`)).not.toBeVisible();
  });

  test('should cancel task editing', async ({ page }) => {
    const originalText = 'Buy Groceries';
    await page.fill('input[placeholder="Add a new task..."]', originalText);
    await page.click('button:has-text("Add")');
    await page.click('button[aria-label="Edit task"]');
    await page.fill('input[type="text"]', 'Changed text');
    await page.click('button[aria-label="Cancel edit"]');
    
    await expect(page.locator(`text=${originalText}`)).toBeVisible();
    await expect(page.locator('text=Changed text')).not.toBeVisible();
  });

  test('should delete a task', async ({ page }) => {
    await page.fill('input[placeholder="Add a new task..."]', 'Task to delete');
    await page.click('button:has-text("Add")');
    await page.click('button[aria-label="Delete task"]');
    await expect(page.locator('text=Task to delete')).not.toBeVisible();
  });

  test('should clear all tasks', async ({ page }) => {
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    for (const task of tasks) {
      await page.fill('input[placeholder="Add a new task..."]', task);
      await page.click('button:has-text("Add")');
    }
    await expect(page.locator('text=3 tasks left')).toBeVisible();
    await page.click('button:has-text("Clear all tasks")');
    for (const task of tasks) {
      await expect(page.locator(`text=${task}`)).not.toBeVisible();
    }
    await expect(page.locator('text=0 tasks left')).toBeVisible();
    await expect(page.locator('text=Empty task')).toBeVisible();
  });

  test('should handle task completed', async ({ page }) => {
    await page.fill('input[placeholder="Add a new task..."]', 'Toggle task');
    await page.click('button:has-text("Add")');
    await page.click('input[type="checkbox"]');
    await expect(page.locator('text=0 tasks left')).toBeVisible();
  });

  test('should maintain task order (newest first)', async ({ page }) => {
    const tasks = ['First task', 'Second task', 'Third task'];
    for (const task of tasks) {
      await page.fill('input[placeholder="Add a new task..."]', task);
      await page.click('button:has-text("Add")');
    }
    const taskElements = page.locator('li');
    
    // Verify order (newest first due to reverse())
    await expect(taskElements.nth(0)).toContainText('Third task');
    await expect(taskElements.nth(1)).toContainText('Second task');
    await expect(taskElements.nth(2)).toContainText('First task');
  });
});
