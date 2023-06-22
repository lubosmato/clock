// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .setup(|app| {
            let window = app.get_window("main").expect("could not get window");
            window
                .set_ignore_cursor_events(true)
                .expect("could not set ignore cursor events");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
